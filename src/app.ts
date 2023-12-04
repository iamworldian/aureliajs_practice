
import { Router, RouterConfiguration } from 'aurelia-router';
import { PLATFORM, inject } from "aurelia-framework";


import { WebAPI } from "./assets/web-api";

@inject(WebAPI)
export class App {
  router: Router;

  constructor(private api : WebAPI) { }
  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = "Contacts";
    config.options.pushState = true;
    config.options.root = "/";
    config.map([
      {
        route: "",
        moduleId: PLATFORM.moduleName("no-selection"),
        title: "Select",
      },
      {
        route: "contacts/:id",
        moduleId: PLATFORM.moduleName("contact-detail"),
        name: "contacts",
      },
    ]);

    this.router = router;
  }
}
