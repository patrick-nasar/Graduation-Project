export const getuserId = () => {
    return localStorage.getItem("userId");
};

export const setuserId = (userId) => {
    localStorage.setItem("userId", userId);
};

export const removeuserId = () => {
    localStorage.removeItem("userId");
};

export const getuserName = () => {
    return localStorage.getItem("userName");
};

export const setuserName = (userName) => {
    localStorage.setItem("userName", userName);
};

export const removeuserName = () => {
    localStorage.removeItem("userName");
};


export const getcompanyId = () => {
    return localStorage.getItem("companyId");
};

export const setcompanyId = (companyId) => {
    localStorage.setItem("companyId", companyId);
};

export const removecompanyId = () => {
    localStorage.removeItem("companyId");
};


export const getadmin = () => {
    return localStorage.getItem("admin");
};

export const setadmin = (admin) => {
    localStorage.setItem("admin", admin);
};

export const removeadmin = () => {
    localStorage.removeItem("admin");
};

export const getteamId = () => {
    return localStorage.getItem("teamId");
};

export const setteamId = (teamId) => {
    localStorage.setItem("teamId", teamId);
};

export const removeteamId = () => {
    localStorage.removeItem("teamId");
};


export const getteamName = () => {
    return localStorage.getItem("teamName");
};

export const setteamName = (teamName) => {
    localStorage.setItem("teamName", teamName);
};

export const removeteamName = () => {
    localStorage.removeItem("teamName");
};