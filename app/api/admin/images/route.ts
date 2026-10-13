import { authorizeEditor } from "@/lib/cms-auth";
import { CmsError, errorResponse, saveImage } from "@/lib/cms-github";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const denied = await authorizeEditor(request);
  if (denied) return denied;
  try {
    const form = await request.formData();
    const image = form.get("image");
    if (!(image instanceof File) || image.size > 4 * 1024 * 1024) throw new CmsError("Choose an image smaller than 4 MB.", 400);
    const bytes = Buffer.from(await image.arrayBuffer());
    let extension: string;
    if (bytes.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff]))) extension = "jpg";
    else if (bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) extension = "png";
    else if (bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP") extension = "webp";
    else throw new CmsError("Choose a JPG, PNG, or WebP image.", 400);
    return Response.json({ path: await saveImage(bytes, extension) });
  } catch (error) { return errorResponse(error); }
}
