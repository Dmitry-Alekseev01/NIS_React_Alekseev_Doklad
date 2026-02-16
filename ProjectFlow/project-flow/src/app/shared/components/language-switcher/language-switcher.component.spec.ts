import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageSwitcherComponent } from './language-switcher.component';
import { I18nService } from '../../../core/services/i18n.service';
import { TranslateService } from '@ngx-translate/core';

describe('LanguageSwitcherComponent', () => {
  let component: LanguageSwitcherComponent;
  let fixture: ComponentFixture<LanguageSwitcherComponent>;
  let i18nServiceSpy: jasmine.SpyObj<I18nService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('I18nService', ['switchLanguage'], { currentLang: 'en' });
    await TestBed.configureTestingModule({
      imports: [LanguageSwitcherComponent],
      providers: [
        { provide: I18nService, useValue: spy },
        { provide: TranslateService, useValue: { use: () => {} } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageSwitcherComponent);
    component = fixture.componentInstance;
    i18nServiceSpy = TestBed.inject(I18nService) as jasmine.SpyObj<I18nService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should switch language', () => {
    component.switchLang('ru');
    expect(i18nServiceSpy.switchLanguage).toHaveBeenCalledWith('ru');
    expect(component.currentLang).toBe('ru');
  });
});