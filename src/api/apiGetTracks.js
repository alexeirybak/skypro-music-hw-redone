const apiAddress = 'https://skypro-music-api.skyeng.tech';

export async function getAllTracks() {
  const response = await fetch(`${apiAddress}/catalog/track/all/`);
  const tracks = await response.json();
  if (!response.ok) {
    throw new Error('Ошибка сервера');
  }
  return tracks;
}

export async function getFavoriteTracks({ token }) {
  const response = await fetch(`${apiAddress}/catalog/track/favorite/all/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 401) throw new Error('Токен протух');
  return await response.json();
}

export async function addLike({ token, id }) {
  const response = await fetch(`${apiAddress}/catalog/track/${id}/favorite/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) throw new Error('Токен протух');
  return await response.json();
}

export async function disLike({ token, id }) {
  const response = await fetch(`${apiAddress}/catalog/track/${id}/favorite/`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 401) throw new Error('Токен протух');
  return await response.json();
}

export async function getCategory({ id }) {
  const response = await fetch(`${apiAddress}/catalog/selection/${id}`, {
    method: 'GET',
  });
  if (response.status === 401)
    throw new Error('Не удалось загрузить плейлист, попробуйте позже');
  return await response.json();
}
