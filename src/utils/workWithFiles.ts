type Resolution = {
  width: number;
  height: number;
}

function prepareLink (link: string): string {
  if (link === '' || link === '#') return link;

  const httpRegex: RegExp = /(http:\/\/)|(https:\/\/)/gi;

  if (httpRegex.test(link) !== true)
    return `http://${link}`;

  return link;
};

function checkImage (file: Blob, resolution: Resolution): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const reader: FileReader = new FileReader();

    reader.onload = () => {
      const img: HTMLImageElement = document.createElement('img');

      img.src = reader.result;
      img.onload = (event: Event) => {
        const validWidth: boolean = (resolution.width <= 180);
        const validHeight: boolean = (resolution.height <= 100);
        const bool: boolean = validWidth && validHeight;

        bool ? resolve(true) : reject(false);
      }

      img.onerror = () => reject(false);
    }
    reader.onerror = () => reject(false);
    reader.readAsDataURL(file);
  })
};

export {
  prepareLink,
  checkImage,
};
