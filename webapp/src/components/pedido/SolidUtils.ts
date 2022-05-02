import { LoginButton, useSession } from "@inrupt/solid-ui-react";
import {
    getSolidDataset, getStringNoLocale, getThing, Thing, getUrlAll,
    saveSolidDatasetAt, createSolidDataset, buildThing, createThing,
    setThing, addStringNoLocale, saveSolidDatasetInContainer
} from "@inrupt/solid-client";
import { handleIncomingRedirect, login, fetch, getDefaultSession } from '@inrupt/solid-client-authn-browser'
import { SCHEMA_INRUPT, RDF, AS, FOAF, VCARD } from "@inrupt/vocab-common-rdf";



async function getProfile(webId: string): Promise<Thing> {
  let profileDocumentURI = webId.split("#")[0]; // we remove the right hand side of the # for consistency
  let myDataset = await getSolidDataset(profileDocumentURI); // obtain the dataset from the URI
  return getThing(myDataset, webId) as Thing; // we obtain the thing we are looking for from the dataset
}

export async function getNameFromPod(webId: string) {
  if (webId === "" || webId === undefined) return "Name not found"; // we return the empty string
  return getStringNoLocale(await getProfile(webId), FOAF.name) as string;
}

export async function getRoleFromPod(webId: string) {
  if (webId === "" || webId === undefined) return "Role not found"; // we return the empty string
  return await getStringNoLocale(await getProfile(webId), VCARD.role) as string;
}

export async function getAddressesFromPod(webId: string) {
  console.log("webid: "+webId);
  let direccionesPod = getUrlAll(await getProfile(webId), VCARD.hasAddress);
  let direcciones: string = "";

  for (let addressURL of direccionesPod) {
    let callePOD = getStringNoLocale(
      await getProfile(addressURL),
      VCARD.street_address
    );
    let localidadPOD = getStringNoLocale(
      await getProfile(addressURL),
      VCARD.locality
    );
    let regionPOD = getStringNoLocale(await getProfile(addressURL), VCARD.region);
    let codigo_postalPOD = getStringNoLocale(
      await getProfile(addressURL),
      VCARD.postal_code
    );

    if (callePOD){
      let direccionString = callePOD! +","+localidadPOD! +","+regionPOD!+","+codigo_postalPOD! +"$";
      direcciones+=direccionString;
    }
  }
  return direcciones;
  
}