import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'rounded-xl border-gray-700 bg-gray-800/50 text-gray-200 shadow-sm focus:border-emerald-500/50 focus:ring focus:ring-emerald-500/20 backdrop-blur-sm transition-all ' +
                className
            }
            ref={localRef}
        />
    );
});
