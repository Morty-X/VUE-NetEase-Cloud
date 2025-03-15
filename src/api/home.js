import { request } from '../utils/request';

export const getSearchDefault = () => request.get('/search/default');

export const getHomeData = () => request.get('/homepage/block/page');
