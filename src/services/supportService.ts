
import { supabase } from '@/integrations/supabase/client';

export interface SupportTicket {
    id: string;
    title: string;
    content: string;
    created_at: string;
    status: 'received' | 'pending' | 'resolved'; // Status is inferred for now
}

export const sendSupportRequest = async (
    userId: string,
    subject: string,
    message: string,
    metadata?: any
): Promise<boolean> => {
    try {
        const { error } = await supabase.from('user_notes').insert({
            user_id: userId,
            title: `Support: ${subject}`,
            content: JSON.stringify({
                message,
                metadata: {
                    ...metadata,
                    sent_at: new Date().toISOString(),
                    app_version: '1.0.0', // Could be dynamic
                }
            }),
            category: 'support'
        });

        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Error in sendSupportRequest:', error);
        return false;
    }
};

export const fetchUserTickets = async (userId: string): Promise<SupportTicket[]> => {
    try {
        const { data, error } = await supabase
            .from('user_notes')
            .select('*')
            .eq('user_id', userId)
            .eq('category', 'support')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return (data || []).map(note => {
            let content = note.content || '';
            let message = content;

            try {
                // Try to parse JSON content if available
                const parsed = JSON.parse(content);
                message = parsed.message || content;
            } catch (e) {
                // Not JSON, use as is
            }

            return {
                id: note.id,
                title: note.title.replace('Support: ', ''),
                content: message,
                created_at: note.created_at,
                status: 'received' // Default status
            };
        });
    } catch (error) {
        console.error('Error in fetchUserTickets:', error);
        return [];
    }
};
