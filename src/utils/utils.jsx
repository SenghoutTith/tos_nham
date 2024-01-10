export const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};

export const shortenText = (text, maxLength) => {
    if (text && text.length > maxLength) {
        const trimmedText = text.substring(0, maxLength).concat("...")
        return trimmedText
    }
    return text;
}

export const convertToCambodiaTime = (date) => {
    return new Date(date).toLocaleString("en-US", { 
      timeZone: "Asia/Phnom_Penh", 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
}