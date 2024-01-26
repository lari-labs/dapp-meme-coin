const create = (proto) => {
  const Ctor = () => {};
  Ctor.prototype = proto;
  return new Ctor();
};

export { create };

const getInstance = (self, constructor) => {
  return self instanceof constructor ? self : create(constructor.prototype);
};
export { getInstance };

const tagged = (...fields) => {
  const wrapped = function () {
    const self = getInstance(this, wrapped);
    if (arguments.length != fields.length)
      throw new TypeError(
        `Expected ${fields.length} arguments, got ${arguments.length}`,
      );
    for (let i = 0; i < fields.length; i++) self[fields[i]] = arguments[i];
    return self;
  };
  wrapped._length = fields.length;
  return wrapped;
};
export { tagged };

const taggedSum = (constructors) => {
  const definitions = function () {
    throw new TypeError(
      'Tagged sum was called instead of one of its properties.',
    );
  };

  const makeCata = (key) => {
    return function (dispatches) {
      const fields = constructors[key];
      if (!dispatches[key])
        throw new TypeError(
          `Constructors given to cata didn't include: ${key}`,
        );
      const args = fields.map((field) => this[field]);
      return dispatches[key].apply(this, args);
    };
  };

  const makeProto = (key) => {
    const proto = Object.create(definitions.prototype);
    proto.cata = makeCata(key);
    return proto;
  };

  for (let key in constructors) {
    if (!constructors[key].length) {
      definitions[key] = makeProto(key);
      continue;
    }
    definitions[key] = tagged.apply(null, constructors[key]);
    definitions[key].prototype = makeProto(key);
  }

  return definitions;
};
export { taggedSum };
