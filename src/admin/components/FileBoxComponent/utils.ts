export function checkLink (link: string): string {
  if (link === '' || link === '#') return link;

  const httpRegex: RegExp = /(http:\/\/)|(https:\/\/)/gi;

  if (httpRegex.test(link) !== true)
    return `http://${link}`;

  return link;
}

export function checkFile (file: Blob): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const reader: FileReader = new FileReader();

    reader.onload = e => {
      const img: HTMLImageElement = document.createElement('img');

      img.src = reader.result;
      img.onload = (event: Event) => {
        const validWidth: boolean = (img.width <= 180);
        const validHeight: boolean = (img.height <= 100);
        const bool: boolean = validWidth && validHeight;

        if (bool)
          resolve(true)
        else
          reject(false);
      }

      img.onerror = (event: Event) => reject(false);
    }
    reader.onerror = (event: Event) => reject(false);
    reader.readAsDataURL(file);
  })
}