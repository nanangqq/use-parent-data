/**
 * get data from parent
 * @param T_parentData - type of data from parent, default any
 * @returns data from parent
 */
export declare const useParentDataChild: <T_parentData = any>() => {
    parentData: T_parentData;
};
/**
 * send data to child
 * @param data - data sending to child
 * @param iframeRef - iframe ref
 * @param T_data - type of data sending to child, default any
 */
export declare const useParentDataParent: <T_data = any>({ data, iframeRef, }: {
    data: T_data;
    iframeRef: React.RefObject<HTMLIFrameElement>;
}) => void;
