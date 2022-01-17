import api from '../../../../services/api';

async function getBanner(id, props) {
  const url = `/TsmHOTSITE/BANNER_FICHA/${id}`;
  const res = await api.get(url, { auth: props.auth });
  if (res.data.banner.length > 0) {
    const { dispatch } = props;
    dispatch({ type: '@HOTSITE_BANNER', payload: `data:image/jpg;base64, ${res.data.banner}` });
  }
  return res.data;
}

export default getBanner;
