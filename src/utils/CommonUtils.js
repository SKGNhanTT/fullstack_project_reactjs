class CommonUtils {
    static toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onnerror = (error) => reject(error);
        });
}

export default CommonUtils;
