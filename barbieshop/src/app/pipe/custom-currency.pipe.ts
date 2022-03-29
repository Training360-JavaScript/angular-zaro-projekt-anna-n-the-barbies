import { Pipe, PipeTransform } from '@angular/core';
import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeHu from '@angular/common/locales/hu';
registerLocaleData(localeHu, 'hu');

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

  transform(
    value: any,
    currencyCode: string = 'HUF',
    digitsInfo: string = '1.0-2',
    locale: string = 'hu',
    ): string | null {
      return formatCurrency(
        value,
        locale,
        getCurrencySymbol(currencyCode, 'narrow'),
        currencyCode,
        digitsInfo,
        );
      }
  }



