import { Component, OnInit } from "@angular/core";

interface Feature {
  link: string;
  icon: string;
  label: string;
}

@Component({
  selector: "lostark-helper-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.less"]
})
export class HomeComponent implements OnInit {
  features: Feature[] = [
    {
      link: "/checklist",
      icon: "check-square",
      label: "Track my daily/weekly tasks"
    },
    {
      link: "/roster",
      icon: "user-switch",
      label: "Configure my roster"
    },
    {
      link: "/gold-planner",
      icon: "gold",
      label: "Check how much gold I can make every week"
    },
    {
      link: "/mari-optimizer",
      icon: "credit-card",
      label: "Optimize Mari purchases"
    },
    {
      link: "/honing-cost-optimizer",
      icon: "arrow-up",
      label: "Optimize Honing costs"
    },
    {
      link: "/party-planner",
      icon: "team",
      label: "Check what I can do with my friends"
    },
    {
      link: "/friends",
      icon: "smile",
      label: "Manage my friends"
    },
    {
      link: "/tasks-manager",
      icon: "solution",
      label: "Configure my task tracking system"
    },
    {
      link: "/settings",
      icon: "setting",
      label: "Configure the application"
    }
  ];

  featuredFeatures: Feature[] = [];

  ngOnInit(): void {
    this.featuredFeatures = this.shuffle(this.features).slice(0, 3);
  }

  private shuffle<T>(array: T[]): T[] {
    return array.map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }


}
