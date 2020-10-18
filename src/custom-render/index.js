/**
 * @author: iceman
 * @date: 2020/10/18.
 */
import ReactReconciler from 'react-reconciler';

function attachAttribute(instance, attributeName, attributeValue) {
	if (attributeName === 'children') {
		if (typeof attributeValue === 'string' || typeof attributeValue === 'number') {
			instance.textContent = attributeValue;
		}
		return ;
	}
	if (attributeName === 'className') {
		instance.setAttribute('class', attributeValue);
	}
	if (attributeName.match(/^on([\s\S]+)$/)) {
		instance.addEventListener(
			RegExp.$1.replace(/^([\s\S])/, text => text.toLowerCase()),
			attributeValue);
		return;
	}
	instance.setAttribute(attributeName, attributeValue);
}

const hostConfig = {
	supportsMutation: true,
	
	getRootHostContext(nextRootInstance) {
		console.log('getRootHostContext');
		// console.log('nextRootInstance', nextRootInstance);
	},
	
	getChildHostContext(context, fiberType, rootInstance) {
		console.log('getChildHostContext');
	},
	
	shouldSetTextContent(type, props) {
		console.log('shouldSetTextContent');
		return typeof props.children === 'string' || typeof props.children === 'number';
	},
	prepareForCommit() {},
	resetAfterCommit() {},
	createTextInstance(
		newText, rootContainerInstance,
		currentHostContext, workInProgress) {
		// rootContainerInstance is a DOM Element
		// so we can append the newText directly
		// console.log('newText', newText);
		// console.log('rootContainerInstance', rootContainerInstance);
		console.log('createTextInstance');
		const textNode = document.createTextNode(newText);
		return textNode;
	},
	
	createInstance(
		type, newProps, rootContainerInstance,
		currentHostContext, workInProgress) {
		// type is the DOM type, like div, img, span and etc.
		// newProps are the DOM attributes, is a object param
		// {src, className, alt}
		// console.log('type', type);
		// console.log('newProps', newProps);
		console.log('createInstance');
		const domElement = document.createElement(type);
		Object.keys(newProps).forEach((props) => {
			const value = newProps[props];
			attachAttribute(domElement, props, value);
		});
		return domElement;
	},
	
	appendChild(parent, stateNode) {
		console.log('appendChild');
		// console.log('parent', parent);
		// console.log('stateNode', stateNode);
	},
	
	appendAllChildren(instance, workInProgress, needsVisibilityToggle, isHidden) {
		// console.log('instance', instance);
		// console.log('workInProgress', workInProgress);
		// console.log('needsVisibilityToggle', needsVisibilityToggle);
		// console.log('isHidden', isHidden);
		console.log('appendAllChildren');
	},
	
	appendInitialChild(parent, node) {
		// console.log('parent', parent);
		// console.log('node', node);
		// return parent.appendChild(node);
		console.log('appendInitialChild');
		parent.appendChild(node);
	},
	
	finalizeInitialChildren(
		newInstance, type, newProps,
		rootContainerInstance, currentHostContext) {
		console.log('finalizeInitialChildren');
		// console.log('newInstance', newInstance);
		// console.log('type', type);
		// console.log('rootContainerInstance', rootContainerInstance);
		// console.log('currentHostContext', currentHostContext);
	},
	
	appendChildToContainer(parent, stateNode) {
		// both parent and stateNode are DOM instance
		// console.log('parent', parent);
		// console.log('stateNode', stateNode);
		parent.appendChild(stateNode);
	},
	
	removeChildFromContainer(currentParent, node) {
		currentParent.removeChild(node);
	},
	
	prepareUpdate(
		instance, type, oldProps, newProps,
		rootContainerInstance, currentHostContext) {
		// console.log('instance', instance);
		// console.log('type', type);
		return true;
	},
	
	removeChild(currentParent, node) {
		currentParent.removeChild(node);
	},
	
	commitUpdate(instance, updatePayload, type, oldProps, newProps, finishedWork) {
		// console.log('commitUpdate');
		// console.log('instance', instance);
		// console.log('updatePayload', updatePayload);
		// console.log('type', type);
		// console.log('oldProps', oldProps);
		// console.log('newProps', newProps);
		Object.keys(newProps).forEach(propName => {
			const propValue = newProps[propName];
			if (propValue === oldProps[propName]) {
				return;
			}
			attachAttribute(instance, propName, propValue);
		});
	},
	
	insertBefore(parent, stateNode, before) {
		parent.insertBefore(stateNode, before);
	}
};

const ReactReconcilerInst = ReactReconciler(hostConfig);

export default ({
	render(reactElement, domElement, callback) {
		// Create a root Container if it doesnt exist
		
		if (!domElement._rootContainer) {
			domElement._rootContainer = ReactReconcilerInst.createContainer(domElement, false);
		}
		
		// update the root Container
		return ReactReconcilerInst.updateContainer(reactElement, domElement._rootContainer, null, callback);
	}
})