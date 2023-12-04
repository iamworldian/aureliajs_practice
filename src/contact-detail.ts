import { inject } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";
import { ContactUpdated, ContactViewed } from "./messages";

import { areEqual } from "./assets/utility";
import { WebAPI } from "./assets/web-api";
import { Redirect } from "aurelia-router";

interface Contact {
  firstName: string;
  lastName: string;
  email: string;
  id: number;
}

@inject(WebAPI, EventAggregator)
export class ContactDetail {
  routeConfig;
  contact: Contact;
  originalContact: Contact;

  constructor(private api: WebAPI, private ea: EventAggregator) {}

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;
    console.log('activates');
    return this.api.getContactDetails(params.id).then((contact) => {
      this.contact = <Contact>contact;
      this.routeConfig.navModel.setTitle(this.contact.firstName);
      this.originalContact = JSON.parse(JSON.stringify(this.contact));
      this.ea.publish(new ContactViewed(this.contact));
    });
  }

  get canSave() {
    return (
      this.contact.firstName && this.contact.lastName && !this.api.isRequesting
    );
  }

  save() {
    this.api.saveContact(this.contact).then((contact) => {
      this.contact = <Contact>contact;
      this.routeConfig.navModel.setTitle(this.contact.firstName);
      this.originalContact = JSON.parse(JSON.stringify(this.contact));
      this.ea.publish(new ContactUpdated(this.contact));
    });
  }

  canDeactivate() {
    if (!areEqual(this.originalContact, this.contact)) {
      const result = confirm(
        "You have unsaved changes. Are you sure you wish to leave?"
      );

      if (!result) {
        this.ea.publish(new ContactViewed(this.contact));
      }


      return result;
    }

    return true;
  }
}
