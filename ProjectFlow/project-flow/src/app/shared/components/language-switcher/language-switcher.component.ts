import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../../core/services/i18n.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent {
  currentLang: string;

  constructor(private i18n: I18nService) {
    this.currentLang = this.i18n.currentLang;
  }

  switchLang(lang: string) {
    this.i18n.switchLanguage(lang);
    this.currentLang = lang;
  }
}