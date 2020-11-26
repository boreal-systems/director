const REGEX = {
  HOST: '(\\b((25[0-5]|2[0-4]\\d|[01]?\\d{1,2}|\\*)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d{1,2}|\\*))|((([a-fA-F0-9]{1,4}|):){1,7}([a-fA-F0-9]{1,4}|:))|(^(?=^.{1,253}$)(([a-z\\d]([a-z\\d-]{0,62}[a-z\\d])*[.]){1,3}[a-z]{1,61})$)',
  PORT: '^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$',
  SIGNEDINT: '^-?\\d+$',
  SIGNEDFLOAT: '([+-]?(?=\\.\\d|\\d)(?:\\d+)?(?:\\.?\\d*))(?:[eE]([+-]?\\d+))?'
}

export default REGEX
