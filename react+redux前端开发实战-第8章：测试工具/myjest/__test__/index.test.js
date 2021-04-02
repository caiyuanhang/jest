import React from 'react';
import Link from '../index';
import TestRenderer from 'react-test-renderer';
test('Link changes the class when hovered', () => {
    const component = TestRenderer.create(<Link url="https://jestjs.io/">
        Delightful JavaScript Testing
    </Link>);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    tree.props.onMouseEnter();

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    tree.props.onMouseLeave();

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})