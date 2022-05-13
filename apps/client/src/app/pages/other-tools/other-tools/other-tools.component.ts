import { Component } from "@angular/core";

@Component({
  selector: "lostark-helper-other-tools",
  templateUrl: "./other-tools.component.html",
  styleUrls: ["./other-tools.component.less"]
})
export class OtherToolsComponent {
  otherTools = [
    {
      name: "Lost Ark Market",
      url: "https://lostarkmarket.online",
      image: "lostarkmarket.png",
      description: "Open Source, crowd-sourced marketboard website with crafting profits optimizer and an open, documented API."
    },
    {
      name: "Lost Ark Ability Stone Calculator",
      url: "https://lostark.meta-game.gg/ability-stone-calculator",
      image: "ability-stone-calculator.png",
      description: "Ability stone refining helper, with ability to set a goal and report result to have the best next move."
    },
    {
      name: "Lost Merchants",
      url: "https://lostmerchants.com/",
      image: "lost-merchants.png",
      description: "Open Source, crowd-sourced wandering merchants tracker with ability to have notifications for specific items."
    }
  ];

  openTool(url: string): void {
    window.open(url, "_blank");
  }
}
