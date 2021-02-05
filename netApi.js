// gameOS theme
// Copyright (C) 2018-2020 Seth Powell 
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

// This file contains some helper scripts for formatting data

var apiUrl = 'http://wekafei.cn/';

function fetch(url, method='GET', callback) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.responseType = 'json';
  xhr.onload = () => {
    let status = xhr.status;
    if (status == 200) {
      callback(status, xhr.response);
    } else {
      callback(status, null);
    }
  };
  xhr.send();
}

function fetchDataSucc(url, callback, method='GET') {
  fetch(url, method, (_, response) => {
    if (response && response.status.toUpperCase() === 'SUCCESS') {
      callback(response.data)
    }
  });
}

function get(url, callback) {
  fetch(url, 'GET', (_, response) => {
    if (response && response.status.toUpperCase() === 'SUCCESS') {
      callback(response.data)
    }
  });
}

function post(url, callback) {
  fetch(url, 'POST', (_, response) => {
    if (response && response.status.toUpperCase() === 'SUCCESS') {
      callback(response.data)
    }
  });
}

function encodeQueryData(data) {
  const ret = [];
  for (let d in data)
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  return ret.join('&');
}

function scrapyGameInfo(crc32, searchName, platform, cbSucc) {
  var params = {
    sid: 'ad23d27ccab4613742c691bccccf62b3',
    time: '1605890949',
    sign: 'bc1f2845b8aae0fdee972a411547d5f5',
    platform: platform,
    crc32: crc32,
    searchName: searchName,
  }

  var url = apiUrl + '/server/LbGameInfo/scrapyGameForPegasus?' + encodeQueryData(params)
  get(url, cbSucc);
}
