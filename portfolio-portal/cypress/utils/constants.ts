export function categories(request : any) {
  const commonCategories = [
    { category: "front_NRIC", file: "test-file.png" },
    { category: "back_NRIC", file: "test-file.png" },
    { category: "skip_cvs", file: "test-file.png" },
    { category: "osd", file: "test-file.png" }
  ];

  const foreignerCategories = [
    { category: "Passport", file: "test-file.png" },
    // { category: "OtherSupportingDocuments", file: "test-file.png" }
  ];

  const smeCategories = [
    { category: "sme", file: "test-file.png" }
  ];

  let response = [];

  if (request.orderType === 'sme') {
    response = [...commonCategories, ...smeCategories];
  } else if (request.orderType === 'consumer' && request.idType === 'passport') {
    response = foreignerCategories;
  } else {
    response = commonCategories;
  }

  return response;
}

export function customerDetails() {
    const response = {
        customerName : 'John Doe',
        customerTitle : 'Mr.',
        customerRace : 'MELAYU',
        customerReligion : 'ISLAM',
        customerGender : 'Male',
        customerEmail : 'automate@gmail.com'
      }
    return response;
}

export function addressDetails() {
    const response = {
        addressOne : 'automate address 1',
        addressTwo : 'automate address 2',
        addressThree : 'automate address 3',
        addressPostcode : '44000',
        addresCity : 'Shah Alam',
        addressState : 'Selangor'
      }
    return response;
}

export function msr() {
    const response = {
        RESIDENTIAL : 3,
        RESIDENTIAL_SUPPLEMENTARY : 5,
        COMPANY_WITHOUT_BRN : 10,
        COMPANY_WITH_BRN : 10
      }
    return response;
}

export function device() {
  const deviceName = {
      Samsung_Galaxy_S23 : 'Samsung Galaxy S23',
      Samsung_Galaxy_S23_Plus : 'Samsung Galaxy S23+',
      Samsung_Galaxy_S23_Ultra : 'Samsung Galaxy S23 Ultra',
      Galaxy_Z_Fold4 : 'Galaxy Z Fold4',
      Galaxy_Z_Flip4 : 'Galaxy Z Flip4',
      Xiaomi_12T : 'Xiaomi 12T',
      Vivo_Y02s : 'vivo Y02s'
    }
  return deviceName;
}

export function setScenario() {
  /* 
    Set scenario accordingly
    env : 'local', 'sit', 'preprod', 'prod'
    existingCustomer : source/parent
    existingCustomer : target/child
    device : Available device
    verificationTag : CONTACTLESS - Will always Pay Later
                      THUMB_PROBLEM
  */
  const response = {
    env : 'sit',
  }
  return response;
}