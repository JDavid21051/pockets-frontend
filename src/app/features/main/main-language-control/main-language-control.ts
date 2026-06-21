import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { APP_MENU_LANG } from '@/infra/const/app-menu-lang.const';
import { AllowedLanguagesEnum } from '@/domain/enums/allowed-languages.enum';
import { cn } from '@/infra/parsers/css-class-name';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'krih-main-language-control',
  imports: [TranslatePipe, MatIcon, MatTooltip],
  templateUrl: './main-language-control.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLanguageControl {
  private translate: TranslateService = inject(TranslateService);
  protected readonly cn = cn;
  readonly languagesList = APP_MENU_LANG;
  readonly langSelected = signal(AllowedLanguagesEnum.es);

  onClickChangeLanguage(selected: AllowedLanguagesEnum) {
    this.translate.use(selected);
    this.langSelected.set(selected);
  }
}
