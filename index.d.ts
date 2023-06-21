/**
 * get data from parent
 * @param targetOrigin - target origin, default '*'
 * @returns data from parent
 * @param T_parentData - type of data from parent, default any
 */
export declare const useParentDataChild: <T_parentData = any>(targetOrigin?: string) => {
    parentData: T_parentData;
};
/**
 * send data to child when child is ready
 * @param data - data sending to child
 * @param iframeRef - iframe ref
 * @param targetOrigin - target origin, default '*'
 * @param T_data - type of data sending to child, default any
 */
export declare const useParentDataParent: <T_data = any>({ data, iframeRef, targetOrigin, }: {
    data: T_data;
    iframeRef: React.RefObject<HTMLIFrameElement>;
    targetOrigin?: string;
}) => void;
