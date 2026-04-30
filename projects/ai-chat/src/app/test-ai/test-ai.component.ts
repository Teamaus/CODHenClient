import { Component } from "@angular/core";

import { Directive, forwardRef, Inject } from '@angular/core';
import {
  ASK,
  ASK_TOPICS,
  IChatMessage,
  IPubsub,
  PUBSUB,
  PUBSUB_SUBSCRIPTION,
} from './contract/INotification';
import { ChatSubscriber } from './subscriber';
import { PublishService } from './publish.service';

@Directive({
  selector: 'notification',
  providers: [
    /* 1️⃣ Provide the directive instance under the `ASK` token. */
    { provide: ASK, useExisting: forwardRef(() => AskDirective) },
    /* 2️⃣ Topic list that this directive subscribes to. */
    { provide: ASK_TOPICS, useValue: ['ask'] },
    /* 3️⃣ Inject the PublishService for publishing responses. */
    PublishService,
  ],
})
export class TestAiComponent {
  doSomething() { /* … */ }
}