import { expect, fixture, html } from "@open-wc/testing";
import { localize } from "../src";
import { render } from "lit";

describe("localize-directive", () => {
  describe("overrides", () => {
    let container;

    function doRender(overrides) {
      render(
        html` <vaadin-date-picker ${localize(overrides)}></vaadin-date-picker>`,
        container
      );
    }

    function getElement() {
      return container.querySelector("vaadin-date-picker");
    }

    before(async () => {
      container = await fixture(html` <div></div>`);
    });

    it("should work with undefined overrides", () => {
      doRender();
      expect(getElement().i18n.today).to.equal("Today");
    });

    it("should apply overrides", () => {
      doRender({ today: "foo" });
      expect(getElement().i18n.today).to.equal("foo");
    });

    it("should not re-render if overrides did not change", () => {
      const overrides = { today: "foo" };
      doRender(overrides);

      getElement().i18n.today = "bar";
      doRender(overrides);
      expect(getElement().i18n.today).to.equal("bar");
    });

    it("should re-render if overrides change", () => {
      doRender({ today: "foo" });
      expect(getElement().i18n.today).to.equal("foo");

      doRender({ today: "bar" });
      expect(getElement().i18n.today).to.equal("bar");
    });

    it("should revert to original value if override is cleared", () => {
      doRender({ today: "foo", customProp: "bar" });
      expect(getElement().i18n.today).to.equal("foo");
      expect(getElement().i18n.customProp).to.equal("bar");

      doRender();
      expect(getElement().i18n.today).to.equal("Today");
      expect(getElement().i18n.customProp).to.be.undefined;
    });
  });
});
