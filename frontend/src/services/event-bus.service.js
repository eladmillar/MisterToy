function on(eventName, listener) {
  const callListener = ({ detail }) => {
    listener(detail);
  };
  window.addEventListener(eventName, callListener);
  return () => {
    window.removeEventListener(eventName, callListener);
  };
}

function emit(eventName, data) {
  window.dispatchEvent(new CustomEvent(eventName, { detail: data }));
}

export const eventBus = { on, emit };

export function showMsg(txt, type = 'success') {
  emit('show-msg', { txt, type });
}

export function showSuccessMsg(txt) {
  showMsg({ txt, type: 'success' })
}
export function showErrorMsg(txt) {
  showMsg({ txt, type: 'error' })
}

// window.myBus = eventBusService;
