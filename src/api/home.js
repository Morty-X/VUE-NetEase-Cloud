// import { request } from '../utils/request';
import { request } from '../utils/index';

export const getSearchDefault = () => request.get('/search/default');

export const getHomeData = () => request.get('/homepage/block/page');
