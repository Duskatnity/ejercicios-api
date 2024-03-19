class DividerRight extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
    <style>
    .split {
      height: 100%;
      width: 50%;
      position: fixed;
      z-index: 1;
      top: 0;
      overflow-x: hidden;
      padding-top: 20px;
    }

    /* Control the left side */
    .right {
      right: 0;
      background-color: white;
    }
    </style>

    <div class="split right">
      <slot></slot>
    </div>

      `
  }
}

customElements.define('divider-right-component', DividerRight)
