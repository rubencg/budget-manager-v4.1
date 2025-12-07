import { Configuration, DashboardApi, CategoriesApi } from ".";

export const getApiBasePath = () => {
    const basePath = import.meta.env.VITE_API_URL;
    if (!basePath) {
        console.warn('API base path not found in environment variables. Using default.');
        return 'http://localhost:5000';
    }
    return basePath;
}

export const createDashboardApi = (accessToken: string) => {
    const config = new Configuration({
        basePath: getApiBasePath(),
        accessToken: accessToken,
    });
    return new DashboardApi(config);
};

export const createCategoriesApi = (accessToken: string) => {
    const config = new Configuration({
        basePath: getApiBasePath(),
        accessToken: accessToken,
    });
    return new CategoriesApi(config);
};
