import {carTypes} from './carActions';
import {regionTypes} from './regionsActions';

export const actionTypes = {
    ...carTypes, ...regionTypes
};
