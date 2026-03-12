import { toast } from 'sonner';

export interface CodeProject {
    id: string;
    title: string;
    description?: string;
    language: string;
    code: string;
    created_at: string;
    updated_at: string;
}

const STORAGE_KEY = 'codio_code_projects';

/**
 * Save a code project to localStorage
 */
export const saveProject = async (
    title: string,
    language: string,
    code: string,
    description?: string
): Promise<{ success: boolean; projectId?: string; error?: string }> => {
    try {
        const projects = getAllProjects();

        const newProject: CodeProject = {
            id: Date.now().toString(),
            title,
            description,
            language,
            code,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        projects.push(newProject);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));

        return { success: true, projectId: newProject.id };
    } catch (error: any) {
        console.error('Save project error:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Update an existing project
 */
export const updateProject = async (
    projectId: string,
    updates: Partial<CodeProject>
): Promise<{ success: boolean; error?: string }> => {
    try {
        const projects = getAllProjects();
        const index = projects.findIndex(p => p.id === projectId);

        if (index === -1) {
            return { success: false, error: 'Project not found' };
        }

        projects[index] = {
            ...projects[index],
            ...updates,
            updated_at: new Date().toISOString()
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
        return { success: true };
    } catch (error: any) {
        console.error('Update project error:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Load all projects for the current user
 */
export const loadUserProjects = async (): Promise<{ success: boolean; projects?: CodeProject[]; error?: string }> => {
    try {
        const projects = getAllProjects();
        return { success: true, projects };
    } catch (error: any) {
        console.error('Load projects error:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Load a specific project by ID
 */
export const loadProject = async (projectId: string): Promise<{ success: boolean; project?: CodeProject; error?: string }> => {
    try {
        const projects = getAllProjects();
        const project = projects.find(p => p.id === projectId);

        if (!project) {
            return { success: false, error: 'Project not found' };
        }

        return { success: true, project };
    } catch (error: any) {
        console.error('Load project error:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Delete a project
 */
export const deleteProject = async (projectId: string): Promise<{ success: boolean; error?: string }> => {
    try {
        const projects = getAllProjects();
        const filtered = projects.filter(p => p.id !== projectId);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        return { success: true };
    } catch (error: any) {
        console.error('Delete project error:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Helper function to get all projects from localStorage
 */
const getAllProjects = (): CodeProject[] => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Failed to parse projects from localStorage:', error);
        return [];
    }
};
