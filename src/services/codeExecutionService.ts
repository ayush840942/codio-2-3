import { toast } from 'sonner';

// Using Piston API (free, open-source code execution engine)
const PISTON_API_URL = 'https://emkc.org/api/v2/piston';

export interface ExecutionResult {
    success: boolean;
    output: string;
    error?: string;
    executionTime?: number;
}

export interface LanguageVersion {
    language: string;
    version: string;
    aliases: string[];
}

// Language mappings for Piston API
const LANGUAGE_MAP: Record<string, string> = {
    python: 'python',
    cpp: 'c++',
    java: 'java',
    go: 'go',
    rust: 'rust',
    javascript: 'javascript',
    typescript: 'typescript'
};

/**
 * Execute code using Piston API
 */
export const executeCode = async (
    language: string,
    code: string
): Promise<ExecutionResult> => {
    try {
        const pistonLanguage = LANGUAGE_MAP[language];

        if (!pistonLanguage) {
            return {
                success: false,
                output: '',
                error: `Language ${language} not supported for server-side execution`
            };
        }

        const startTime = Date.now();

        const response = await fetch(`${PISTON_API_URL}/execute`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                language: pistonLanguage,
                version: '*', // Use latest version
                files: [
                    {
                        name: getFileName(language),
                        content: code
                    }
                ],
                stdin: '',
                args: [],
                compile_timeout: 10000, // 10 seconds
                run_timeout: 5000, // 5 seconds
                compile_memory_limit: -1,
                run_memory_limit: -1
            })
        });

        const executionTime = Date.now() - startTime;

        if (!response.ok) {
            throw new Error(`API request failed: ${response.statusText}`);
        }

        const result = await response.json();

        // Check for compilation errors
        if (result.compile && result.compile.code !== 0) {
            return {
                success: false,
                output: result.compile.output || '',
                error: result.compile.stderr || 'Compilation failed',
                executionTime
            };
        }

        // Check for runtime errors
        if (result.run && result.run.code !== 0) {
            return {
                success: false,
                output: result.run.stdout || '',
                error: result.run.stderr || 'Runtime error',
                executionTime
            };
        }

        // Success
        return {
            success: true,
            output: result.run?.stdout || result.run?.output || '',
            error: result.run?.stderr || undefined,
            executionTime
        };

    } catch (error: any) {
        console.error('Code execution error:', error);
        return {
            success: false,
            output: '',
            error: error.message || 'Failed to execute code'
        };
    }
};

/**
 * Get available languages and versions from Piston
 */
export const getAvailableLanguages = async (): Promise<LanguageVersion[]> => {
    try {
        const response = await fetch(`${PISTON_API_URL}/runtimes`);

        if (!response.ok) {
            throw new Error('Failed to fetch available languages');
        }

        const runtimes = await response.json();
        return runtimes;
    } catch (error) {
        console.error('Failed to fetch languages:', error);
        return [];
    }
};

/**
 * Get appropriate file name based on language
 */
const getFileName = (language: string): string => {
    const fileNames: Record<string, string> = {
        python: 'main.py',
        cpp: 'main.cpp',
        java: 'Main.java',
        go: 'main.go',
        rust: 'main.rs',
        javascript: 'main.js',
        typescript: 'main.ts'
    };

    return fileNames[language] || 'main.txt';
};

/**
 * Validate code before execution
 */
export const validateCode = (language: string, code: string): { valid: boolean; error?: string } => {
    if (!code || code.trim().length === 0) {
        return { valid: false, error: 'Code cannot be empty' };
    }

    if (code.length > 50000) {
        return { valid: false, error: 'Code is too long (max 50,000 characters)' };
    }

    // Language-specific validation
    if (language === 'python' && code.includes('import os') && code.includes('system')) {
        return { valid: false, error: 'System commands are not allowed' };
    }

    return { valid: true };
};
