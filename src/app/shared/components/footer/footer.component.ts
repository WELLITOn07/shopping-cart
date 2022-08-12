import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  imgGithub: string = 'https://icons.iconarchive.com/icons/alecive/flatwoken/48/Apps-Github-B-icon.png';
  changeImg: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  changeIcon() {
    this.changeImg = !this.changeImg;
    if (this.changeImg) {
      this.imgGithub = 'https://icons.iconarchive.com/icons/alecive/flatwoken/48/Apps-Github-B-icon.png';
    } else {
      this.imgGithub = 'https://icons.iconarchive.com/icons/alecive/flatwoken/48/Apps-Github-icon.png';
    }
  }

}
