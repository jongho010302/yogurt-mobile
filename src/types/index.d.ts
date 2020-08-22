import {
  NavigationScreenProp,
  NavigationParams,
  NavigationState,
} from 'react-navigation';

export interface NavigationProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export interface AxiosResponse {
  data: ApiResponse;
}

export interface ApiResponse {
  success: boolean;
  data: any;
  message: string;
}
