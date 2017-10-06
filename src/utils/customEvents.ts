interface Options {
  target?: HTMLElement;
  detail?: any;
}

const CustomEvents = {
  emit (eventName: string, options: Options = {}) {
    const { target = document, detail } = options; 
    const event = new CustomEvent(eventName, {
      detail
    });

    target.dispatchEvent(event);
  }
};

export default CustomEvents;
