class NoteItem extends HTMLElement {
    _shadowRoot = null;
    _style = null;
    _note = {
        idNote: null,
        title: null,
        body: null,
        createdAt: null,
        archived: null,
    }

    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._style = document.createElement('style');
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    set note(value) {
        this._note = value;
        this.render();

        console.log(this._note);
    }

    get note() {
        return this._note;
    }

    _updateStyle() {
        this._style.textContent = `
            :host {
                display: block;
            }

            div.card {
                height: 160px;
                padding: 24px;
                border-radius: 8px;
                box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5);
                overflow: hidden;
            }

            h3#notesTitle {
                margin-bottom: 8px;
                font-weight: 900;
                color: #003C43;
            }

            div#notesDesc {
                margin-top: 12px;
                font-size: 16px;
                color: #77B0AA;
            }

            div#notesDesc p {
                margin: 0;
                padding: 0;
            }
        `;
    }

    render() {
        this._emptyContent();
        this._updateStyle();

        let bodyNote = this._note.body;

        if (bodyNote.includes('\n')) {
            const lines = bodyNote.split('\n');
            bodyNote = lines.map(line => `<p>${line}</p>`).join('');
        }

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `      
            <div class="card">
                <h3 id="notesTitle">${this._note.title}</h3>
                <div id="notesDesc">${bodyNote}</div>
            </div>
        `;
    }
}

customElements.define('note-item', NoteItem);