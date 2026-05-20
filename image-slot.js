(function () {
  class ImageSlot extends HTMLElement {
    connectedCallback() {
      const src = this.getAttribute("src");
      const alt = this.getAttribute("alt") || "";
      const placeholder = this.getAttribute("placeholder") || "O";
      const shape = this.getAttribute("shape") || "circle";
      const radius = this.getAttribute("radius") || "16";
      const position =
        this.getAttribute("position") || (shape === "circle" ? "center" : "50% 25%");

      this.style.display = this.style.display || "grid";
      this.style.placeItems = "center";
      this.style.overflow = "hidden";
      this.style.borderRadius = shape === "circle" ? "999px" : `${radius}px`;

      if (src) {
        this.textContent = "";
        this.style.background = "var(--panel-2)";
        const img = document.createElement("img");
        img.src = src;
        img.alt = alt;
        img.loading = "lazy";
        img.decoding = "async";
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";
        img.style.objectPosition = position;
        img.style.display = "block";
        this.appendChild(img);
        return;
      }

      this.style.background = "var(--accent)";
      this.style.color = "var(--bg)";
      this.style.fontFamily = "\"Instrument Serif\", serif";
      this.style.fontStyle = "italic";
      this.style.fontSize = shape === "circle" ? "18px" : "22px";

      if (!this.textContent.trim()) {
        this.textContent = placeholder.length <= 3 ? placeholder : "O";
      }
    }
  }

  if (!customElements.get("image-slot")) {
    customElements.define("image-slot", ImageSlot);
  }
})();
