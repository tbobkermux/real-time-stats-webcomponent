const template = document.createElement('template');

class RealTimeViewCount extends HTMLElement {
  get token() {
    return this.getAttribute('token');
  }

  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[property] = newValue;
  }

  connectedCallback() {
    this.getRealTimeViews();
  }

  getRealTimeViews() {
    return new Promise((res, rej) => {
      fetch(`https://stats.mux.com/counts?token=${this.token}`)
        .then((data) => data.json())
        .then((json) => {
          this.renderData(json);
          res();
        })
        .catch((error) => rej(error));
    });
  }

  renderData(data) {
    console.log(data.data[0]);
    let views = data.data[0].views.toString();
    let viewers = data.data[0].viewers.toString();
    this.textContent = `Viewers: ${viewers}, Views: ${views}`;
  }
}

window.customElements.define('mux-real-time-views', RealTimeViewCount);