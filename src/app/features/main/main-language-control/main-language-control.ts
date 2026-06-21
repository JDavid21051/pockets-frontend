import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { APP_MENU_LANG } from '@/infra/const/app-menu-lang.const';
import { AllowedLanguagesEnum } from '@/domain/enums/allowed-languages.enum';
import { cn } from '@/infra/parsers/css-class-name';

@Component({
  selector: 'krih-main-language-control',
  imports: [TranslatePipe, MatIcon],
  templateUrl: './main-language-control.html',
  styleUrl: './main-language-control.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLanguageControl {
  protected readonly cn = cn;
  readonly languagesList = APP_MENU_LANG;
  readonly langSelected = signal(AllowedLanguagesEnum.es);

  onClickChangeLanguage(selected: AllowedLanguagesEnum) {
    this.langSelected.set(selected);
  }
}
