import { Controller } from "@hotwired/stimulus";
import TemplateRenderer from "helpers/template_renderer";

// Connects to data-controller="bogleheads-calculator"
export default class extends Controller {
  static targets = ["resultsTemplate", "resultsContainer"];

  calculate(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const parseFormData = key => parseFloat(formData.get(key).replace(/[^0-9.-]+/g, ''));

    const monthlyExpenses = parseFormData("invested_amount");

    this.#renderResults({ totalValue: monthlyExpenses });
    return;
  }

  #renderResults(data) {
    const resultsElement = this.resultsRenderer.render(data);
    this.resultsContainerTarget.innerHTML = "";
    this.resultsContainerTarget.appendChild(resultsElement);
  }

  get resultsRenderer() {
    return new TemplateRenderer(this.resultsTemplateTarget);
  }
}
