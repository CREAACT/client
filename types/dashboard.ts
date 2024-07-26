import { IBoilerPart } from "./boilerparts";

export interface IDashboardSlider {
  items: IBoilerPart[]; // Теперь импортируем IBoilerPart из IBoilerParts
  spinner: boolean;
  goToPartPage?: boolean;
}

export interface ICartAlertProps {
  count: number;
  closeAlert: VoidFunction;
}