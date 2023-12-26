import validator from 'validator';
import isValidPath from 'is-valid-path';

const isValidUrl = validator.isURL;

const Parser: ParserInterface = {};

interface ParserInterface {
  parse?: (content: string) => Playlist;
}

interface PlaylistHeader {
  attrs: {
    'x-tvg-url'?: string;
  };
  raw: string;
}

interface PlaylistItemTvg {
  id: string;
  name: string;
  url: string;
  logo: string;
  rec: string;
  shift: string;
  image: string;
}

interface PlaylistItem {
  name: string;
  tvg: PlaylistItemTvg;
  group: {
    title: string;
  };
  http: {
    referrer: string;
    'user-agent': string;
  };
  url: string;
  raw: string;
  line: number;
  timeshift: string;
  catchup: {
    type: string;
    source: string;
    days: string;
  };
}

interface Playlist {
  header: PlaylistHeader;
  items: PlaylistItem[];
}

Parser.parse = (content: string) => {
  let playlist = {
    header: {},
    items: []
  } as Playlist

  let lines = content.split('\n').map(parseLine)
  let firstLine = lines.find(l => l.index === 0)

  if (!firstLine || !/^#EXTM3U/.test(firstLine.raw)) throw new Error('Playlist is not valid')

  playlist.header = parseHeader(firstLine)

  let i = 0
  const items = {}
  for (let line of lines) {
    if (line.index === 0) continue
    const string = line.raw.toString().trim()
    if (string.startsWith('#EXTINF:')) {
      const EXTINF = string
      items[i] = {
        name: extractName(EXTINF),
        tvg: {
          id: extractAttribute(EXTINF, 'tvg-id'),
          name: extractAttribute(EXTINF, 'tvg-name'),
          logo: extractAttribute(EXTINF, 'tvg-logo'),
          url: extractAttribute(EXTINF, 'tvg-url'),
          rec: extractAttribute(EXTINF, 'tvg-rec'),
          shift: extractAttribute(EXTINF, 'tvg-shift'),
          image: extractAttribute(EXTINF, 'tvg-image')
        },
        group: {
          title: extractAttribute(EXTINF, 'group-title')
        },
        http: {
          referrer: '',
          'user-agent': extractAttribute(EXTINF, 'user-agent')
        },
        url: undefined,
        raw: line.raw,
        line: line.index + 1,
        catchup: {
          type: extractAttribute(EXTINF, 'catchup'),
          days: extractAttribute(EXTINF, 'catchup-days'),
          source: extractAttribute(EXTINF, 'catchup-source')
        },
        timeshift: extractAttribute(EXTINF, 'timeshift')
      }
    } else if (string.startsWith('#EXTVLCOPT:')) {
      if (!items[i]) continue
      const EXTVLCOPT = string
      items[i].http.referrer = extractOption(EXTVLCOPT, 'http-referrer') || items[i].http.referrer
      items[i].http['user-agent'] =
        extractOption(EXTVLCOPT, 'http-user-agent') || items[i].http['user-agent']
      items[i].raw += `\r\n${line.raw}`
    } else if (string.startsWith('#EXTGRP:')) {
      if (!items[i]) continue
      const EXTGRP = string
      items[i].group.title = extractValue(EXTGRP) || items[i].group.title
      items[i].raw += `\r\n${line.raw}`
    } else {
      if (!items[i]) continue
      const url = extractURL(string)
      const user_agent = extractParameter(string, 'user-agent')
      const referrer = extractParameter(string, 'referrer')
      if (url && (isValidPath(url) || isValidUrl(url, { require_protocol: true, protocols: ['http', 'https', 'rtmp', 'rtsp'] } ))) {
        items[i].url = url
        items[i].http['user-agent'] = user_agent || items[i].http['user-agent']
        items[i].http.referrer = referrer || items[i].http.referrer
        items[i].raw += `\r\n${line.raw}`
        i++
      } else {
        if (!items[i]) continue
        items[i].raw += `\r\n${line.raw}`
      }
    }
  }

  playlist.items = Object.values(items)

  return playlist
}

function parseLine(line: string, index: number) {
  return {
    index,
    raw: line
  }
}

function parseHeader(line: { raw: string, index: number }) {
  const supportedAttrs = ['x-tvg-url', 'url-tvg']

  let attrs = {}
  for (let attrName of supportedAttrs) {
    const tvgUrl = extractAttribute(line.raw, attrName)
    if (tvgUrl) {
      attrs[attrName] = tvgUrl
    }
  }

  return {
    attrs,
    raw: line.raw
  }
}

function extractName(line: string): string {
  let info = line.replace(/\="(.*?)"/g, '')
  let parts = info.split(/,(.*)/)

  return parts[1] || ''
}

function extractAttribute(line: string, name: string): string {
  let regex = new RegExp(name + '="(.*?)"', 'gi')
  let match = regex.exec(line)

  return match && match[1] ? match[1] : ''
}

function extractOption(line: string, name: string): string {
  let regex = new RegExp(':' + name + '=(.*)', 'gi')
  let match = regex.exec(line)

  return match && match[1] && typeof match[1] === 'string' ? match[1].replace(/\"/g, '') : ''
}

function extractValue(line: string): string {
  let regex = new RegExp(':(.*)', 'gi')
  let match = regex.exec(line)

  return match && match[1] && typeof match[1] === 'string' ? match[1].replace(/\"/g, '') : ''
}

function extractURL(line: string): string {
  return line.split('|')[0] || ''
}

function extractParameter(line: string, name: string): string {
  const params = line.replace(/^(.*)\|/, '')
  const regex = new RegExp(name + '=(\\w[^&]*)', 'gi')
  const match = regex.exec(params)

  return match && match[1] ? match[1] : ''
}

export default Parser;
