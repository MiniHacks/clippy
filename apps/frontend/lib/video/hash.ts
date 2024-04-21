// export async function hash(file: File) {
//   // get byte array of file
//   let buffer = await file.arrayBuffer();
//
//   // hash the message
//   const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
//
//   // convert ArrayBuffer to Array
//   const hashArray = Array.from(new Uint8Array(hashBuffer));
//
//   // convert bytes to hex string
//   const hex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
//   console.log(hex)
//   return hex;
// }
/**
 * @param file
 */
// export async function hash(data: string | Blob, algorithm: "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512" = "SHA-256") {
//
//   const main = async (msgUint8) => { // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#converting_a_digest_to_a_hex_string
//     const hashBuffer = await crypto.subtle.digest(algorithm, msgUint8)
//     const hashArray = Array.from(new Uint8Array(hashBuffer))
//     return hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
//   }
//
//   if (data instanceof Blob) {
//     const arrayBuffer = await data.arrayBuffer()
//     const msgUint8 = new Uint8Array(arrayBuffer)
//     return await main(msgUint8)
//   }
//   const encoder = new TextEncoder()
//   const msgUint8 = encoder.encode(data)
//   return await main(msgUint8)
// }


// new md5 hash of "{unix epoch in ms}{file size in bytes}"
export async function hash(file: File) {
  const buffer = new TextEncoder().encode(`${file.lastModified}${file.size}`)
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}
