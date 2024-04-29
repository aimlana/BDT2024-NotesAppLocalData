class FooterBar extends HTMLElement {
    _shadowRoot = null;
    _style = null;

    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: "open" });
        this._style = document.createElement("style");
    }

    _updateStyle() {
        this._style.textContent = `
            :host {
                display: block;
            }

            div.container {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 32px 60px;
            }
    
            .app-brand-footer {
                font-size: 30px;
                font-weight: 600;
                color: #e3fef7;
                
            }
            
            .main-footer {
                font-size: 12px;
                color: #e3fef7;
            }
        `;
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this._emptyContent();
        this._updateStyle();

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `      
            <div class="container">
                <div class="app-brand-footer">NotesApp</div>
                <div class="main-footer">Copyright &copy; <span id="currentYear"></span> Muh. Salim Maulana. All rights reserved.</div>
            </div>
        `;
    }
}

customElements.define('footer-bar', FooterBar);