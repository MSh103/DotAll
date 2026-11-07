

export async function convertPNGToJPG(file, quality, bgColor="#FFFFFF")
{
        const bitmap = await createImageBitmap(file);

        const canvas = document.createElement("canvas");

        canvas.width = bitmap.width;
        canvas.height = bitmap.height;

        const ctx = canvas.getContext("2d");

        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(bitmap, 0, 0);
        bitmap.close();

        return new Promise((resolve, reject) => {
                canvas.toBlob(blob => {
                        if(!blob) {
                                reject(new Error("Conversion failed"));
                                return;
                        }

                        resolve(blob);
                }, "image/jpeg", quality);
        });
}