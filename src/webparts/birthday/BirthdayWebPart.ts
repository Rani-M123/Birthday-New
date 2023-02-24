import * as React from 'react';
import {
  Birthday,
  IBirthdaysPerMonthProps,
} from "./components/Birthday";
import { BirthdaysInMonth } from "../../models/BirthdaysInMonth";
import { SharePointService } from "../../utils/SharePointService";
import  {spfi, SPFx, SPFI  } from '@pnp/sp'
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
 
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';





export interface IBirthdayWebPartProps {
 
}

export default class BirthdayWebPart extends BaseClientSideWebPart<IBirthdayWebPartProps> {
  private _spfi: SPFI;

  public async render(): Promise<void> {
    const sharePointService = new SharePointService(this._spfi);
    const birthdays: Array<BirthdaysInMonth> =
      await sharePointService.GetBirthdays();
    const elementProps: IBirthdaysPerMonthProps = {
      data: birthdays,
    };
    const element: React.ReactElement<IBirthdaysPerMonthProps> =
      React.createElement(Birthday, elementProps);

    ReactDom.render(element, this.domElement);  

  
  }

  protected onInit(): Promise<void> {
    this._spfi = spfi().using(SPFx(this.context));
    return super.onInit();
  }



  // private _getEnvironmentMessage(): Promise<string> {
  //   if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
  //     return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
  //       .then(context => {
  //         let environmentMessage: string = '';
  //         switch (context.app.host.name) {
  //           case 'Office': // running in Office
  //             environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
  //             break;
  //           case 'Outlook': // running in Outlook
  //             environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
  //             break;
  //           case 'Teams': // running in Teams
  //             environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
  //             break;
  //           default:
  //             throw new Error('Unknown host');
  //         }

  //         return environmentMessage;
  //       });
  //   }

  //   return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
  // }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    // this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [],
        },
      ],
    };
  }
}

