import { NavigationActions } from "react-navigation";
import { NavigationStackProp } from "react-navigation-stack";

export default (navigation: NavigationStackProp, stack: string, screen: string, params: object) => {
    const navigateAction = NavigationActions.navigate({
        routeName: stack,
        action: NavigationActions.navigate({ routeName: screen, params})
    })
    navigation.dispatch(navigateAction);
}